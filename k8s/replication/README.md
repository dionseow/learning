## Keeping pods healthy

Liveness probe - checks if a container is still alive. K8s will periodically execute the probe and restart the container if the probe fails.

Probe using one of 3 mechanisms.

* An HTTP GET probe performs an HTTP GET request on the container’s IP address, a port and path you specify. If the probe receives a response, and the response code doesn’t represent an error (in other words, if the HTTP response code is 2xx or 3xx), the probe is considered successful. If the server returns an error response code or if it doesn’t respond at all, the probe is considered a failure and the container will be restarted as a result.
* A TCP Socket probe tries to open a TCP connection to the specified port of the container. If the connection is established successfully, the probe is successful. Otherwise, the container is restarted.
* An Exec probe executes an arbitrary command inside the container and checks the command’s exit status code. If the status code is 0, the probe is successful. All other codes are considered failures.

*HTTP get probe*
```
apiVersion: v1
kind: Pod
metadata:
  name: kubia-liveness
spec:
  containers:
  - image: luksa/kubia-unhealthy       
    name: kubia
    livenessProbe:                     
      httpGet:                         
        path: /                        
        port: 8080          
    # Wait 15s b4 executing the first probe
      initialDelaySeconds: 15           
```
A probe should be configured to perform requests on a specific URL path (/health) and have the app perform an internal status check of all the vital components running inside the app to ensure none of them have died or is unresponsive

Make sure the probe is not affected by external factors (eg: frontend server fails because it can't connect to backend server)

## Replication controllers

Replication controllers are a k8s resource that ensures its pods are always kept running

A replication controller constantly monitors the list of running pods and makes sure the actual number of pods of a "type" always match the desired number.

Consists of 3 parts:
* Label selector - determines what pods are in the RC's scope
* Replica count - specifies desired number of pods that should be running
* Pod template - used to create new pod replicas

*Getting info of a rc*
```
$ kubectl get rc
```
*Delete an RC and all the pods it's managing*
```
$ kubectl delete rc kubia --cascade=false
```

## ReplicaSets

A ReplicaSet behaves exactly like a ReplicationController, but it has more expressive pod selectors. Whereas a ReplicationController’s label selector only allows matching pods that include a certain label, a ReplicaSet’s selector also allows matching pods that lack a certain label or pods that include a certain label key, regardless of its value.

Also, for example, a single ReplicationController can’t match pods with the label env=production and those with the label env=devel at the same time. It can only match either pods with the env=production label or pods with the env=devel label. But a single ReplicaSet can match both sets of pods and treat them as a single group.

Similarly, a ReplicationController can’t match pods based merely on the presence of a label key, regardless of its value, whereas a ReplicaSet can. For example, a ReplicaSet can match all pods that include a label with the key env, whatever its actual value is (you can think of it as env=*).

## DaemonSets

Used for running a single pod on each and every node in the cluster  
(More for system level operations like a log collector or resource monitor)  
Can also specify node selectors so that only these nodes have pods running on them managed by the daemonset

## Jobs

Jobs are useful for ad hoc tasks, where it’s crucial that the task finishes properly. You could run the task in an unmanaged pod and wait for it to finish, but in the event of a node failing or the pod being evicted from the node while it is performing its task, you’d need to manually recreate it. Doing this manually doesn’t make sense—especially if the job takes hours to complete.

An example of such a job would be if you had data stored somewhere and you needed to transform and export it somewhere.