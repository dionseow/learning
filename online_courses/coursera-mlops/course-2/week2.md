# Feature engineering

## Intro to preprocessing

- Making data useful b4 training a model
- Representing data in forms that help model learn
- Inc predictive quality
- Reducing dimensionality with feature eng
- Feature eng during training must be the same during serving

## Preprocessing operations

Data preprocessing: transforms raw data into a clean and training-ready dataset

Feature engineering maps:
- Raw data into feature vectors
- Integer values to floating-point vectors
- Normalizes numerical values
- Strings and categorical values to vectors of numeric values
- Data from one space to a diff space

## Feature eng techniques

Numerical range
- Scaling - Converts val from their natural range into prescribed ranged
- - Helps neural nets converge faster
- - Do away with NaN errors during training
- - For each feature, the model learns the right weights
- Normalizing
- Standardizing

Grouping
- Bucketizing
- BOW

Other techniques
- PCA
- t-SNE
- UMAP

Feature crosses
- Combined multiple features into a new feature
- Encodes non-linearity in the feature space or encodes the same info in fewer features

Feature coding
- Transform categorical to a continuous variable

### Key points
Prepares, tunes, transforms, extracts and constructs features

# Feature transformation at scale

## Preprocessing data at scale

### Inconsistences in feature engineering

- Training and serving code paths are diff
- Diverse deployment scenarious (mobile, server, web)
- Risk of introducing training-serving skews
- Skews will lower the performance of your serving model

### Preprocessing granularity

| Instance level | Full-pass|
|----------------|----------|
|Clipping        | Minmax|
|Multiplying     | Standard scaling|
|Expanding features| Bucketizing|

### When do you transform

Transforms within the model
- Easy but inc model latency

Transform per batch

## Optimizing instance-level transformations

- Indirectly affect training efficiency
- Soln: Prefetch transforms for better accelerator efficiency

## Key points

- Inconsistent data affects accuracy of model
- Need for scaled data processing frameworks to process large datasets in efficient manner

## Tensorflow Transform

- ExampleGen - split train/test
- StatisticGen - Calc statistics for each feature
- SchemaGen - infer types of each feature
- Transform - Feature engineering
- Trainer
- Evaluator
- Pusher

### Analyzers

- Full pass over dataset to collect constants for feature eng

# Feature spaces

- N dimensional spaces defined by your N features
- Not incl target label

Feature space coverage
- Train/Eval datasets representative of the serving dataset
- - Same numerical ranges
- - Same classes
- - Similar vocab/syntax/semantics for NLP data

# Feature selection

- Identify features that best represent relationship
- Remove features that dont influence outcome
- Reduce the size of the feature space
- Reduce resource req and model complexity

Why?
- Reduce storage IO cost
- Reduce model prediction time

Unsupervised feature selection
- Features-target variable r/s not considered
- Removes redundant features (correlation)

Supervised feature selection
- Uses feature-target variable r/s
- Selects those contributing the most

3 supervised feature selection
- Filter
- - Correlation
- - - Pearsons, Kendall Tau Rank correlation, Spearson's, Chi-squared
- - Univariate feature selection
- - - SKLearn
- Wrapper
- - Forward selection
- - - Start with 1 feature, add more features one at a time and check performance
- - Backward elimination
- - - Start with all features, remove one at a time and check performance
- - Recursive feature elimination
- - - Select a model to evaluate feature impt, select desired no of features, fit the model, rank features by importance, discard least impt features
- Embedded
- - L1 regularization
- - Feature importance
- - - Use RandomForestClassifier and pull out the feature importance