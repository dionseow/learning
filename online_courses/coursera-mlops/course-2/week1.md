# Intro to MLE in production

ML modeling vs Production ML
|                     | Academic/Research ML | Production ML |
| ------------------- | ----------------------------- |--------------|
| Data                | Static                        | Dynamic - shifting|
| Priority for design | Highest overall accuracy      | Fast inference, good interpretability|
| Model training      | Optimal tuning and training   |Continuously access and retrain|
| Fairness            | Very impt                     |Crucial|
| Challenge           | High accuracy algo           |Entire system|

### Managing the entire life cycle of data

- Labeling
- Feature space coverage
- Minimal dimensionality
- Maximum predictive data
- Fairness

### Challenges
- Build integrated ML systems
- Continuously operate it in production
- Handle continuously changing data
- Optimize compute resource costs

## ML pipelines

- A directed acyclic graph (DAG) is a directed graph that has no cycles
- ML pipeline workflows are usually DAGs
- DAGs define the sequencing of the tasks to be performed, based on their r/s and dependencies

### Pipeline orchestration frameowrks
- Responsible for scheduling the various components in an ML pipeline DAG dependencies
- Help with pipeline automation
- Eg: Airflow, Argo, Celery, Luigi, Kubeflow

### TFX
- End-to-end platform for deploying production ML pipelines
1. Data ingestion
2. Data validation
3. Feature eng
4. Train Model
5. Validate model
6. Push if good
7. Serve model

### Key points
- Production ML pipelines: Automating, monitoring and maintaining end-to-end processes
- Production ML is much more than just ML code. ML dev + software dev
- TFX is an open source end-to-end ML platform

# Collecting data

## Importance of data

Everything starts with data  
Models aren't magic
Meaningful data:
- Maximize predictive content
- Remove non-informative data
- Feature space coverage

## Key considerations

Data availability and collection
- What kind/how much data is avail?
- How often does new data come in
- Is it annotated? If not, how hard/exp to get it labelled

Translate user needs into data needs
- Data needed
- Features needed
- Labels needed

Get to know your data
- Identify data sources
- Check if they are refreshed
- Consistency for value, units and data types
- Monitor outliers and errors

Measure data effectiveness
- Intuition about data value can be misleading - Which features have predictive value and which ones dnt?
- feature eng helps to maximize the predictive signals
- feature selection helps to measure predictive signals

# Labeling data

## Degraded Model performance

### Gradual problems

Data changes
- Trend and seasonality
- Distribution of feature changes
- Relative impt of feature changes

World changes
- Style change
- Scope and processes change
- Competitors change
- Biz expands to other geos

### Sudden changes

 Data collection problem

 - Bad sensor/camera
 - Bad log data
 - Moved or disabled sensors

 System problems
 - Bad software update
 - Loss of network connectivity
 - System down

 ## Data and concept change in production ML

 ### Detecting problems with deployed models

 - Data and scope changes
 - Monitor models and validate data to find probs early
 - Changing ground truth: label new training data

 ### Key points

 Model performance decays over time
 - Data and concept drift

 Model retraining helps to improve performance
 - Data labelling for chaning ground truth and scarce labels

 ## Process feedback and human labelling

Why is labeling impt in prod ML?
- Using biz/org available data
- Freq model retraining
- labeling ongoing and critical process
- Creating a training dataset req labels

### Direct labeling: continuous creation of training datasets

1. Features from inference req
2. Labels from monitoring preds
3. Join results with inference results

Adv:
- Training dataset continuous creation
- labels evolve quickly
- captures strong label signals

disadv:
- hindered by inherent nature of prob
- failure to capture ground truth
- largely bespoke design

### Human labeling: People to examine data and assign labels manually

1. Unlabeled data is collected
2. Raters are recruited
3. Instructions to guide raters
4. Data is divided and assigned to raters
5. labels are collected and conflicts resolved

Adv:
- More labels
- Pure supervised learning

Disadv:
- Quality consistency
- Slow
- Expensive

# Validating data

## Detecting data issues

Drift
- Changes in data over time, such as data collected once a day

Skew
- Diff betwn 2 static versions or diff sources, such as training set and serving set

### Detecting data issues

Detecting schema skew
- Training and serving data do not conform to the same schema

Detecting distribution skew
- Dataset shift -> covariate or concept skew

Req continuous evaluation

Dataset shift -> Ptrain(y, x) =/= Pserve(y,x)
Covaraite shift -> Ptrain(y|x) = Pserve(y|x), Ptrain(x) =/= Pserve(x)
COncept shift -> Ptrain(y|x) =/= Pserve(y|x), Ptrain(x) = Pserve(x)

### Skew detection workflow

1. Check training data baseline stats
2. Check serving data stats
3. Validate they match

## Tensorflow data validation

- Understand, validate and monitor ML data at scale
- Generates data stats and browser viz
- Infers data schema
- Perform validity checks against schema
- Detects training/serving skew

### Skew - TFDV
- Supported for categorical features
- Expressed in terms of L-infinity distance (Chebyshev dist)
- Set a threshold to receive warnings

### Schema skew
- Serv and training data don't conform to same schema
### Feature skew
Training feature values are diff than the serving feature values:
- Feature values are modified btwn training and serv time
- Transformation applied only in one of the two instances
### Dist skew
Distribution of serv and training dataset is sign diff:
- Faulty sampling method during training
- Diff data sources for training and serving data
- Trend, seasonality, changes in data over time
