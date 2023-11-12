# Replicating stateful pods

## StatefulSets

A StatefulSet resource is specifically tailored to applications where instances of the application must be treated as non-fungible individials, with each one having a stable name and state

#### StatefulSet vs ReplicaSets

Pod replicas managed by ReplicaSet or ReplicationController are stateless and hence can be replaced with a completely new pod replica at any time

Stateful pods are different. When a stateful pod dies, the pod instance needs to be resurrected on another node but the new instance needs to get the same name, network identity, and state as the one it's replacing.

A StatefulSet makes sure pods are rescheduled in such a way that they retain their identity and state. Pods created by StatefulSets aren't exact replicas of each other. Each can have it's own set of volumes (storgage) which differentiates it from its peers.

## Replacing pods
Each pod created by a StatefulSet is assigned an ordinal index (zero-based) which is used to derive the pod's name and hostname, and to attach stable storage to the pods. The names of the pods are thus predictable because each pod's name is derived from the StatefulSet's name and the ordinal index of the instance.

StatefulSet also requires you to create a corresponding governing headless service that is used to provide the actual network identity to each pod. Through this service, each pod gets it's own DNS entry so it's peers and other clients in the cluster can address the pod by it's hostname.

When a Stateful pod is replaced, the replacement pod is assigned the same hostname and name as the pod it is replacing.

## Scaling StatefulSets

When a new stateful pod is created they always use the next unused ordinal index hence it is easy to know which pod will be inserted or removed when scaling up or down.

StatefulSets scale down one pod instance at a time as a distributed data store for example may lose data if multiple nodes go down at once. Sequential scaling down allows the data store to create an additional replica to replace a single lost copy.

## StatefulSet storage

Storage for stateful pods need to be persistent and decoupled from the pods. 
When creating a StatefulSet, it creates both the pod and one or more PVCs for the pod at creation time.  
When scaling up a StatefulSet, it creates two or more API objects (the pod and one or more PVC referenced by the pod). Scaling down only deletes the pod but leaves the claims alone in case the PV gets recycled or deleted. Since the PVC is retained after a scale down, a subsequent scale up can reattach the same claim along with the bound PV to the new pod instance

## StatefulSet guarantees

StatefulSets guarantees that two stateful pod instances are never running with the same identity and bound to the same PVC. This means a StatefulSet must be absolutely certain that a pod is no longer running before it can create a replacement pod.

## Creating a StatefulSet

To deploy a StatefulSet app, you would need
* PersistentVolumes for storing your data files (you’ll need to create these only if the cluster doesn’t support dynamic provisioning of PersistentVolumes).
* A governing Service required by the StatefulSet.
* The StatefulSet itself.

For each pod instance, the StatefulSet will create a PersistentVolumeClaim that will bind to a PersistentVolume. If your cluster supports dynamic provisioning, you don’t need to create any PersistentVolumes manually

## Discovering peers in a StatefulSet

SRV records are used to point to hostnames and ports of servers providing a specific service. Kubernetes creates SRV records to point to the hostnames of the pods backing a headless service.

You’re going to list the SRV records for your stateful pods by running the dig DNS lookup tool inside a new temporary pod. This is the command you’ll use:

```
$ kubectl run -it srvlookup --image=tutum/dnsutils --rm
➥  --restart=Never -- dig SRV kubia.default.svc.cluster.local
```
The command runs a one-off pod (--restart=Never) called srvlookup, which is attached to the console (-it) and is deleted as soon as it terminates (--rm). The pod runs a single container from the tutum/dnsutils image and runs the following command:
```
dig SRV kubia.default.svc.cluster.local
```

## Implementing peer discovery through DNS

Each data store node runs completely independently of all the others—no communication exists between them. You’ll get them talking to each other next.

Data posted by clients connecting to your data store cluster through the kubia-public Service lands on a random cluster node. The cluster can store multiple data entries, but clients currently have no good way to see all those entries. Because services forward requests to pods randomly, a client would need to perform many requests until it hit all the pods if it wanted to get the data from all the pods.

You can improve this by having the node respond with data from all the cluster nodes. To do this, the node needs to find all its peers. You’re going to use what you learned about StatefulSets and SRV records to do this.