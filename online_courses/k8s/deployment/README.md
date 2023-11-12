# Deployments

A deployment is a higher level resource meant for deploying applications and updating them declaratively instead of doing it through a ReplicationController or ReplicaSets which are both considered lower-level concepts.

When a deployment is created, a ReplicaSet resource is created underneath (eventually more of them). A deployment simplifies the process of updating an app to the latest version by coordinating the movement to the new version from the old version.

```
$ kubectl create -f kubia-deployment-v1.yaml --record
```
*The record command records the command in the revision history which is useful later on*

*You can use the usual `kubectl get deployment` and the `kubectl describe deployment` to see details of the deployment but there is an additional command made specifically for checking a deployment status
```
$ kubectl rollout status deployment kubia
```

A deployment doesn't manage pods directly, it creates ReplicaSets and leaves the managing to them. After creating a deployment you are able to view the ReplicaSets via the `kubectl get replicasets` command.

## Updating a deployment

To update a deployment, you would just need to modify the pod template defined in the Deployment resource and k8s will handle the rest for you.

How the deployment is updated depends on the deployment strategy which is configured in the deployment yaml.
* RollingUpdate (default) - removes old pods one by one while adding new ones at the same time, keeping the application available throughout the whole process.
* Recreate - deletes all old pods at once then creates new ones. To be used when the app doesn't support running multiple versions in parallel and req the old version to be stopped completely b4 the new one is started

To trigger the actual rollout, first change the image used in the single pod container. Next, use the `kubectl set image` command which allows changing the image of any resource that contains a container.

```
$ kubectl set image deployment kubia nodejs=luksa/kubia:v2
```

*Ways to modify an existing resource in kubernetes*
|Method| What it does|
|----|----|
|kubectl edit|Opens the object’s manifest in your default editor. After making changes, saving the file, and exiting the editor, the object is updated. Example: kubectl edit deployment kubia|
|kubectl patch|Modifies individual properties of an object. Example: kubectl patch deployment kubia -p '{"spec": {"template": {"spec": {"containers": [{"name": "nodejs", "image": "luksa/kubia:v2"}]}}}}'|
|kubectl apply|Modifies the object by applying property values from a full YAML or JSON file. If the object specified in the YAML/JSON doesn’t exist yet, it’s created. The file needs to contain the full definition of the resource (it can’t include only the fields you want to update, as is the case with kubectl patch). Example: kubectl apply -f kubia-deployment-v2.yaml|
|kubectl replace| Replaces the object with a new one from a YAML/JSON file. In contrast to the apply command, this command requires the object to exist; otherwise it prints an error. Example: kubectl replace -f kubia-deployment-v2.yaml|
|kubectl set image|Changes the container image defined in a Pod, ReplicationController’s template, Deployment, DaemonSet, Job, or ReplicaSet. Example: kubectl set image deployment kubia nodejs=luksa/kubia:v2|


## Undoing a deployment

To undo a deployment to a newer version, simply run the command

```
$ kubectl rollout undo deployment kubia
```

An undo is possible because deployments keep a revision history which is stored in the underlying ReplicaSets. When a rollout completes, the old ReplicaSet isn't deleted and this enables rolling back to any revision.

*To view revision history*
```
$ kubectl rollout history deployment kubia
```

## RollingUpdate strategy properties

The RollingUpdate strategy has the maxSurge and maxUnavailable properties which affects how many pods are replaced at once during a deployment rolling update. They can be set in the deployment yaml as such

```
spec:
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    type: RollingUpdate
```
|Property| What it does|
|----|----|
|maxSurge|  Determines how many pod instances you allow to exist above the desired replica count configured on the Deployment. It defaults to 25%, so there can be at most 25% more pod instances than the desired count. If the desired replica count is set to four, there will never be more than five pod instances running at the same time during an update. When converting a percentage to an absolute number, the number is rounded up. Instead of a percentage, the value can also be an absolute value (for example, one or two additional pods can be allowed).|
|maxUnavailable|Determines how many pod instances can be unavailable relative to the desired replica count during the update. It also defaults to 25%, so the number of available pod instances must never fall below 75% of the desired replica count. Here, when converting a percentage to an absolute number, the number is rounded down. If the desired replica count is set to four and the percentage is 25%, only one pod can be unavailable. There will always be at least three pod instances available to serve requests during the whole rollout. As with maxSurge, you can also specify an absolute value instead of a percentage.|

To pause/resume a deployment:

```
kubectl rollout pause deployment kubia
kubectl rollout resume deployment kubia
```

## minimum availability

The minReadySeconds property specifies how long a newly created pod should be ready b4 the pod is treated as available. Until the pod is avail, the rollout process will not continue. A pod is ready when the readiness probes of all it's containers is a success.

The minReadySeconds is used to slow down the rollout process by having k8s wait 10s after a pod was ready b4 continuing with the rollout

A readiness probe prevents bad versions from being rolled out.