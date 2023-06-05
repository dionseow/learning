## Understanding the architecture

A kubernetes cluster is split into 2 parts:
* The kubernetes control plane
* The (worker) nodes

### Control plane
The control plane is what controls and makes the whole cluster function.  
It consists of
* The etcd distributed persistent storage
* The API server
* The scheduler
* The Controller Manager

These components store and manage the state of the cluster, but they aren't what runs the application containers.

### Worker Nodes

The task of running the containers is up to the components running on each worker node.

* The kubelet
* The k8s service proxy (kube-proxy)
* THe container runtime (Docker, rkt or others)

### Add on components

* DNS server
* Dashboard
* Ingress controller
* Container network interface network plugin


Kubernetes system components communicate only with the API server. They don’t talk to each other directly. The API server is the only component that communicates with etcd. None of the other components communicate with etcd directly, but instead modify the cluster state by talking to the API server.

Although the components on the worker nodes all need to run on the same node, the components of the Control Plane can easily be split across multiple servers. There can be more than one instance of each Control Plane component running to ensure high availability. While multiple instances of etcd and API server can be active at the same time and do perform their jobs in parallel, only a single instance of the Scheduler and the Controller Manager may be active at a given time—with the others in standby mode.

The Control Plane components, as well as kube-proxy, can either be deployed on the system directly or they can run as pods

The Kubelet is the only component that always runs as a regular system component, and it’s the Kubelet that then runs all the other components as pods. To run the Control Plane components as pods, the Kubelet is also deployed on the master.

### etcd

All the objects you’ve created throughout this book—Pods, ReplicationControllers, Services, Secrets, and so on—need to be stored somewhere in a persistent manner so their manifests survive API server restarts and failures. For this, Kubernetes uses etcd, which is a fast, distributed, and consistent key-value store. Because it’s distributed, you can run more than one etcd instance to provide both high availability and better performance.

The only component that talks to etcd directly is the Kubernetes API server. All other components read and write data to etcd indirectly through the API server. This brings a few benefits, among them a more robust optimistic locking system as well as validation; and, by abstracting away the actual storage mechanism from all the other components, it’s much simpler to replace it in the future. It’s worth emphasizing that etcd is the only place Kubernetes stores cluster state and metadata.

### API server

The Kubernetes API server is the central component used by all other components and by clients, such as kubectl. It provides a CRUD (Create, Read, Update, Delete) interface for querying and modifying the cluster state over a RESTful API. It stores that state in etcd.

In addition to providing a consistent way of storing objects in etcd, it also performs validation of those objects, so clients can’t store improperly configured objects (which they could if they were writing to the store directly). Along with validation, it also handles optimistic locking, so changes to an object are never overridden by other clients in the event of concurrent updates.

### Scheduler

The scheduler waits for newly created pods through the API server’s watch mechanism and assigns a node to each new pod that doesn’t already have the node set.

The Scheduler doesn’t instruct the selected node (or the Kubelet running on that node) to run the pod. All the Scheduler does is update the pod definition through the API server. The API server then notifies the Kubelet that the pod has been scheduled. As soon as the Kubelet on the target node sees the pod has been scheduled to its node, it creates and runs the pod’s containers.

### Controller Manager

As previously mentioned, the API server doesn’t do anything except store resources in etcd and notify clients about the change. The Scheduler only assigns a node to the pod, so you need other active components to make sure the actual state of the system converges toward the desired state, as specified in the resources deployed through the API server. This work is done by controllers running inside the Controller Manager.

The single Controller Manager process currently combines a multitude of controllers performing various reconciliation tasks. Eventually those controllers will be split up into separate processes, enabling you to replace each one with a custom implementation if necessary. The list of these controllers includes the

* Replication Manager (a controller for ReplicationController resources)
* ReplicaSet, DaemonSet, and Job controllers
* Deployment controller
* StatefulSet controller
* Node controller
* Service controller
* Endpoints controller
* Namespace controller
* PersistentVolume controller
* Others

What each of these controllers does should be evident from its name. From the list, you can tell there’s a controller for almost every resource you can create. Resources are descriptions of what should be running in the cluster, whereas the controllers are the active Kubernetes components that perform actual work as a result of the deployed resources.

Controllers do many different things, but they all watch the API server for changes to resources (Deployments, Services, and so on) and perform operations for each change, whether it’s a creation of a new object or an update or deletion of an existing object. Most of the time, these operations include creating other resources or updating the watched resources themselves (to update the object’s status, for example).

In general, controllers run a reconciliation loop, which reconciles the actual state with the desired state (specified in the resource’s spec section) and writes the new actual state to the resource’s status section. Controllers use the watch mechanism to be notified of changes, but because using watches doesn’t guarantee the controller won’t miss an event, they also perform a re-list operation periodically to make sure they haven’t missed anything.

Controllers never talk to each other directly. They don’t even know any other controllers exist. Each controller connects to the API server and, through the watch mechanism described in section 11.1.3, asks to be notified when a change occurs in the list of resources of any type the controller is responsible for.

### Kubelet

In a nutshell, the Kubelet is the component responsible for everything running on a worker node. Its initial job is to register the node it’s running on by creating a Node resource in the API server. Then it needs to continuously monitor the API server for Pods that have been scheduled to the node, and start the pod’s containers. It does this by telling the configured container runtime (which is Docker, CoreOS’ rkt, or something else) to run a container from a specific container image. The Kubelet then constantly monitors running containers and reports their status, events, and resource consumption to the API server.

The Kubelet is also the component that runs the container liveness probes, restarting containers when the probes fail. Lastly, it terminates containers when their Pod is deleted from the API server and notifies the server that the pod has terminated.

### Kubernetes Service Proxy

Beside the Kubelet, every worker node also runs the kube-proxy, whose purpose is to make sure clients can connect to the services you define through the Kubernetes API. The kube-proxy makes sure connections to the service IP and port end up at one of the pods backing that service (or other, non-pod service endpoints). When a service is backed by more than one pod, the proxy performs load balancing across those pods.