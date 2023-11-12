# Pods

Containers are designed to run only a single process per container.  
A pod of containers allows you to run closely related processes together and provide them with (almost) the same environment as if they were running in a single container while keeping them somewhat isolated.  

All containers of a pod share the same set of linux namespaces (they all share the same port space)  

The main reason to put multiple containers into a single pod is when the application consists of one main process and one or more complementary processes.  

## Sending requests to the pod

To talk to a specific pod without going through a services (for debugging), you can configure port forwarding to the pod

```
kubectl port-forward kubia-manual 8888:8080
```

## Labels

Labels are an arbitrary key-value pair which is attached to a resource. The labels are used when selecting resources via label selectors (resources are filtered based on whethery they include the label specified in the selector)

You can assign labels to other k8s resources (eg: specifying that a worker node has a gpu). When creating a pod which requires a gpu, you would simply need to specify the gpu node to schedule the pod on
```
kubectl label node gke-kubia-85f6-node-0rrx gpu=true
```

```
apiVersion: v1
kind: Pod
metadata:
  name: kubia-gpu
spec:
# tells k8s to deploy this pod only to nodes with the gpu=true label
  nodeSelector:               
    gpu: "true"               
  containers:
  - image: luksa/kubia
    name: kubia
```

## Namespaces

Namespaces are used to isolate processes from each other.  
Using multiple namespaces allows you to split complex systems with numerous components into smaller distinct groups.  
They can also be used for separating resources in a multi-tenant env (eg: prod env and dev env)

*Creating a namespace from yaml*
```
apiVersion: v1
kind: Namespace                  
metadata:
  name: custom-namespace         
```

*Create a pod in a namespace*
```
$ kubectl create -f kubia-manual.yaml -n custom-namespace
```

*Retrieve all pods from a particular namespace*
```
kubectl get po --namespace kube-system
```

