# ConfigMaps and Secrets

Using environment variables eliminates the risk of baking the config into the container itself (req us to rebuild the image everytime the config changes)  

## ENTRYPOINT vs CMD
In a dockerfile...

* ENTRYPOINT defines the executable invoked when the container is started
* CMD specifies the arguments that get passed to the ENTRYPOINT

Correct way is to specify the command to execute through ENTRYPOINT and only specify CMD to define default arguments.  

Override default args in docker with the command  
`docker run -it docker.io/luksa/fortune:args 15`

To override the ENTRYPOINT and CMD in k8s, you can do it through the command and args property.  

containers:
- image: some/image
  command: ['/bin/command']
  args: ['arg1', 'arg2', 'arg3']

## Config maps

Having values hardcoded in the pod definition means you need to have separate pod definitions for prod and dev pods.  
To reuse the same pod definition in multiple envs, it makes sense to decouple the config from the pod descriptor - this is where ConfigMaps can be used.

### ConfigMap via command line
`kubectl create configmap fortune-config --from-literal=sleep-interval=25`
### ConfigMap via file
`kubectl create configmap my-config --from-file=config-file.conf`
### ConfigMap via mix
```
kubectl create configmap my-config  
   --from-file=foo.json                     
   --from-file=bar=foobar.conf              
   --from-file=config-opts/                 
   --from-literal=some=thing                
```
Note: env var cannot contain dashes

## Secrets

Secrets function mostly the same as configmaps except that
* Secrets are always stored in memory, not written to phy storage
* etcd stores Secrets in encrypted form

### Creating a secret with a private key

```
$ openssl genrsa -out https.key 2048
$ openssl req -new -x509 -key https.key -out https.cert -days 3650 -subj
     /CN=www.kubia-example.com
```
```
$ kubectl create secret generic fortune-https --from-file=https.key
➥   --from-file=https.cert --from-file=foo
secret "fortune-https" created

```
Use stringData field to specify non-binary secret data  
The stringData field is write-only and will not be shown when retrieving the secret yaml via `kubectl get -o yaml`
```
kind: Secret
apiVersion: v1
stringData:                                    
  foo: plain text                              
data:
  https.cert: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCekNDQ...
  https.key: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcE...
```
Use secret in pods via
```
    env:
    - name: FOO_SECRET
      valueFrom:                   
        secretKeyRef:              
          name: fortune-https      
          key: foo                       
```