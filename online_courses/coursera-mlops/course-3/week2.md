# Dimensonality Reduction

## Dimensionality Reduction on Performance


### Note on neural networks
- Yes, neural networks will perform a kind of automatic feature selection
- However this is not as efficient as a well designed dataset and model
- - Much of the model can be largely shut off to ignore unwanted features
- - Even unused parts consume space and compute resources
- - Introduce unwanted noise
- - Each feature req infra to collect, store and manage

### High dimensional spaces

- Reducing the dimensionality of the data can allow the model to not overfit so much and generalize better


## Curse of dimensionality

### Many ML methods use the distance measure

- kNN, SVM, Euclidean distance, Recommendation systems

### Why is high dimensional data a problem
- More dimensions -> More features
- RIsk of overfitting our models
- Distrances grow more and more alike
- No clear distinction between clustered objects
- Concentration phenomenon for Euclidean distance

>> As we add more dimensions we also increase the processing power we need to train the model and make predictions, as well as the amount of training data req

### Why are more features bad?

- Redundant/Irrelevant features
- More noise than signal
- Hard to interpret and viz
- Hard to store and process data

### Curse of dimensionality in the distance function

- New dimensions add non-negative terms to the sum
- Distance increases with the num of dimensions
- For a given num of examples, the feature space becomes increasingly sparse.
>> Keeping training examples the same, increasing the feature space increases the distance between indv examples. To account for this, we are forced to add more training examples

### The Hughes effect
- The more the features, the larger the hypothesis space
- The lower the hypothesis space, the easier it is to find the correct hypothesis, the less examples you need

### How dimensionality impacts in other ways
- Runtime and system memory req
- Solns take longer to reach global optima
- More dimensions raise the likelihood of correlated features
### More features req more training data
- More features aren't better if they don't add predictive info
- Num of training instances needed inc expoenntially with each added feature
- Reduces generalization of model

## Manual dimensionality reduction

### Increasing predictive performances
- Features must have info to produce correct results
- Derive features form inherent features
- Extract and recombine to produce good features
### Feature Engineering
- Tabular - aggregate, combine, decompose
- Text- extract context indicators
- Image - prescribe filters for relevant strctures

Iterative process
- Come up with idea to construct "better" features
- Devising features to reduce dimensionality
- Select the right features to maximise predictiveness
- Evaluate models using chosen features

## Algorithmic dimensionality Reduction

### Linear dimensionality reduc

- Linearly project n-dimensional data onto a k-dimensional subspace

### Best K-dimensional subspace for projection

Classification: maximise separation among classes (LDA)  
Regression: Maximise correlation btwn projected data and responve var (Partial least squares)  
Unsupervised: Retain as much data variance as possible (PCA)

## PCA

- Minimization of the orthogonal dist
- Accounts for variance of data in as few dimension as possible

### Steps:

1. Find a line, such that when the data is projected onto that line, it has max variance
2. Find a second line, orthogonal to the first that has max variance
3. Repeat until we have k orthogonal lines

### Pros/Cons

Strenghts:
- Versatile
- Fast and simple
- Several variations

Weaknesses:
- Not interpretable
- Req setting threshold for cumulative explained variance

## Other techniques

### SVD 
- SVD decomposes non-square matrices
- Useful for sparse matrices produced by TF-IDF
- Removes redundant features
### Independent components Analysis
- PCA seeks directions in feature space that minimize reconstruction error
- ICA seeks directions that are most statistically independent
- ICA addresses higher order dependence

||PCA|ICA|
|---|---|--|
|Removes correlations|Y|Y|
|Removes higher order dependence|N|Y|
|All components treated fairly|N|Y|
|Orthogonality|Y|N|

## NMF
- Interpretable and easier to understand
- Req the sample features to be non-negative

# Quantization and Pruning

## Benefits and process of Quantization

Quantization: Transforming a model into an equiv representation uses parameters and computations at a lower precision. This improves the model's execution performance and efficiency, but it can often result in lower model accuracy. This improves the model's execution performance and efficiency, but it can often result in lower model accuracy. 

### Why quantize?

- Neural networks have many parameters and take up space
- Shrinking model file size
- Reduce computational resource
- Make models run faster and use less power for less precision
- Faster compute, low memory bandwidth, low power

### The quantization process

Quantization squeezes a small range of floating-point values into a fixed number of information buckets, concentrating our precious fewer bits within a smaller range

### What parts of the models are affected?

- Static values (parameters)
- Dynamic values (activations)
- Computation (transformations)

## Post Training quantization

- Reduce precistion representation
- Incur small loss in model accuracy
- Joint optimization for model and latency

### Integer quantization
- Small accuracy loss incurred
- Use the benchmarking tools to evaluate model accuracy
- If loss of accuracy is too great, consider using quantization aware training

## Quantization aware training
- Apply quantization while model is being trained
- Inserts fake quantization nodes in the forward pass
- Rewrites the graph to emulate quantized inferences
- Reduces the loss of accuracy due to quantization
- Resulting model contains all data to be quantized according to spec

## Pruning
Remove parts of the model that did not contribute substantially to producing accurate results

Pruning aims to reduce the number of parameters and operations involved in generating a prediction by removing network connections. With pruning, you can lower the overall parameter count in the network

### Model sparsity

- Larger models -> More memory -> Less efficient
- Sparse models -> Less memory -> More efficient

Removing the weights with the lowest magnitude values that are closest to zero until the current sparsity target is reached

### Why prune?

- Better storage and/or transmission
- Gain speedups in CPU and some ML acclerators
- Can be used in tandem with quantization to get additional benefits
- Unlock performance improvements
