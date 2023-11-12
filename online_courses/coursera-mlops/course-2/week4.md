# Advanced labelling

* Manually labelling data is expensive
* Unlabelled data is usually cheap and easy to get
* Unlabelled data contains a lot of info that can improve our model

## Semi-supervised labelling

* Start with a small pool of human labelled data
* Combine that labelled data with a large amount of unlabelled data, where you'll infer the labels for the unlabelled data by looking at how the different human labelled classes are clustered or structured within the feature space 
* Finally train the model using the combination of both datasets

### Label propagation

* Semi-supervised ML algo
* A subset of the examples have labels
* Labels are propagated to the unlabelled points
* * Based on similarity or community structure eg: Unlabelled examples assigned labels based on their neighbours
* * 

## Active Learning

* A family of algos for intelligently sampling data
* Select the points to be labelled that would be most informative for model training
* Very helpful in the following situations
* * Constrained data budgets: can only afford labelling a few points
* * Imbalanced dataset: helps selecting rare classes for training
* * Target metrics: When baseline sampling strategy does not improve selected metrics

### Active learning strategies

* Select labelled examples that will help the model learn
* * Fully supervised approach: From a training dataset with only those examples
* * Semi supervised approach: Label propagation for unlabelled examples

### Active learning cycle

1. Start with a pool of unlabelled data
2. Select a few examples using intelligent sampling
3. Annotate data with human annotators or some other technique
4. This annotation procedure generates up labelled training datasets
5. Use the labelled data to train a model and make predictions
6. Cycle repeats itself

### Intelligent sampling

* Margin sampling - label points the model is least confident in
* Cluster based sampling - sample from well-formed clusters to "cover" the entire space
* Query by committee - train an ensemble of models and sample points that generate disagreement
* Region based sampling - run several active learning algos in diff partitions of the space

## Weak supervision

* Unlabelled ata without ground-truth labels
* One or more weak supervision sources
* * List of heuristics that can automate labelling
* * Typically provided by SME
* Noisy labels have a certain probability of being correct, not 100%
* Obj: Learn a generative model to determine weights for weak supervision sources

### Snorkel framework

* Programmatically build and manage training datasets without manual labelling
* Automatically models, cleans and integrates the resulting training data
* Applies novel, theoretically-grounded techniques
* Also offers data augmentation and slicing

1. Users write labelling func to generate noisy labels for unlabelled data
2. A generative model is used to de-noise and weight the labels
3. Labels are used to train a discriminative model

# Data augmentation

* Generating synthetic data
* Augmentation as a way to expand datasets
* One way is introducing minor alterations like flips/rotations

## How does it help

* Adds exmaples that are similar to real examples
* Improves coverage of feature space
* Beware of invalid augmentations

## Advanced techniques

* Semi-supervised data augmentation: UDA, semi-supervised learning with GANs
* Policy based data augmentation: AutoAugment