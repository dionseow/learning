# High performance modeling

## Distributed training

Types:
- Data parallelism: In this approach, you divide the data into partitions. You copy the complete model to all of the workers, where each one operates on a different partition of the data and the model updates are synchronized across workers. This type of parallelism is model agnostic and can be applied to any neural network architecture. Usually, the scale of data parallelism corresponds to the batch size. 
- Model parallelism: In model parallelism, however, you segment the model into different parts, training concurrently on different workers. Each model will train on the same piece of data. Here workers only need to synchronize the shared parameters, usually once for each forward or back propagation step. You generally use model parallelism when you have a larger model which won't fit into memory on your accelerators.

### Distributed training using data parallelism

- Synchronous training - all workers train and complete updates in sync, supported via all-reduce architecture
- Async training - each worker trains and completes updates separately, supported via parameter server architecture, more efficient but can result in lower acc and slower convergence

>> Req to make your models distribute aware - tf.distribute.Strategy

### One device strategy
- Single device - no distribution
- Typical usage is to test your code b4 switching to other strats
### Mirrored strat
- Training on one machine with multiple GPUs
- - Create a replica per GPU <> variables are mirrored
- - WEight updating is done using efficient cross-device comms algo
### Parameter server strat
- Some machines are designed as workers and others as parameter servers
- - Parameter servers store variables so that workers can perform computations on them
- Implements async data parallelism by default
### Fault tolerance
- Catastrophic failures in one worker would cause failures in dist strat
- Restore training state upon restart from job failure
- Keras backup and restore callback

## High performance ingestion

### Why input pipelines
Data at times can't fit into memory and sometimes, CPUs are under-utilized in compute intersive tasks like training a complex model

You should avoid these inefficiencies so that you can make the most of the hardware avail -> use input pipelines

tf.data: TensorFlow Input Pipeline
- Extract data either local or remote
- Transform eg: Shuffling and batching
- Load: Load transformed data to an accelerator

Pipelining: While accelerator is busy training the current batch of examples, the CPU is already preparing the next batch of examples, thus reducing idle time

### How to optimize pipeline performance?
- Prefetching
- Parallelize data extraction and transformation
- Caching
- Reduce memory

### Parallelize data extraction

- Time to first byte: Prefer local storage as it takes longer to read from remote
- Read throughput: Maximise the aggregate bandwidth of remote storage by reading more files

### Parallelize data transformation
- Post data loading, the inputs may need preprocessing
- Element-wise preprocessing can be parallelized across CPU cores
- Optimal value for the level of parallelism depends on:
1. Size and shape of training data
2. Cost of mapping transformation
3. Load the CPU is currently experiencing
- With tf.data you can use AUTOTUNE to parallelize automatically

## High performance modelling

### Overcoming memory constraints
- Gradient accumulation - split batches into mini-batches and only perform backprop after whole batch
- Memory swap - copy activations between CPU and memory back and firtch

# Knowledge distillation

## Teacher and student networks

### Sophisticated models and their problems

- Large sophisticated models become comploex
- Complex models learn complex tasks
- Can we express this learning more efficiently?

### Knowledge distillation

- Duplicate the performance of a complex model in a simpler model
- Idea: Create a simple "student" model that learns from a complex "teacher" model

## Knowledge distillation techniques

### Teacher and student

- Training objectives of the models vary
- Teacher (normal training)
- Student (knowledge transfer)
- - Matches p-dist of the teacher's predictions to form 'soft targets'
- - 'Soft targets' tell us about the knowledge learned by the teacher

### Transferring "dark knowledge" to the student
- Improve softness of the teacher's dist with 'softmax temperature (T)'
- As T grows, you get more insight about which classes the teacher finds similar to the predicted one

### Techniques
- Approach #1: Weight objectives (student and teacher) and combine during backprop
- Approach #2: Compare dist of the predictions (student and teacher) using KL divergence

### KL divergence

L = (1 - a) Lh + aLkl

## How to distill knowledge for a Q&A task

### Two-stage multi-teacher distillation

Let's take a look at a specific implementation of knowledge distillation for a Q&amp;A task. Let's look at how knowledge can be distilled for question answering. Applying these complex models to real business scenarios become challenging due to the vast amount of model parameters. Older model compression methods generally suffer from information loss during the model compression procedure. Leading to inferior models compared to the original one to tackle this challenge. Researchers at Microsoft proposed a two stage multi teacher knowledge distillation method, or TMKD for short, for a web question answering system. In this approach, they first developed a general Q&amp;A distillation task for student model, pre training. And further fine tune this pre trained student model with a multi teacher knowledge distillation model. The basic knowledge distillation approach presented so far, is known as a one on one model because one teacher transfers knowledge to one student. Although this approach can effectively reduce the number of parameters and the time for model inference. Due to the information loss during knowledge desolation, the performance of the student model is sometimes not on par with that of the teacher. This was the driving force for the authors to create a different approach called M on M or many on many ensemble model. Combining both ensemble and knowledge distillation. This involves first training multiple teacher models. The models could be BERT or GPT or others similarly powerful models, each having different hyper parameters. Then a student model for each teacher model is then trained. Finally, the student models trained from different teachers are ensemble to create the final result. Here, you prepare each teacher for a particular learning objective and then train them. Different models have different generalization of capabilities and they also over fit the training data in different ways, achieving performance close to the teacher model. TMKD outperforms various state of the art baselines and it has been applied to real commercial scenarios since ensemble it is employed here. These compressed models benefit from large scale data and learned feature representations well. Results from experiments show that it can considerably outperformed baseline methods. And even chief comparable results to the original teacher models along with a substantial speed up of model inference. The others performed experiments on several datasets using benchmarks that are public. And even large scale to verify the method's effectiveness to support these claims, let's look at its advantages one by one. A unique aspect of TMKD is that it uses a multi teacher distillation task for student model pre training to boost model performance. To analyze the impact of pre training the authors evaluated two models. The first one TKD is a three layer bert based model which is first trained using basic knowledge distillation pre training on the com Q A dataset. And then fine tune on a task specific corpus by using only one teacher for each task. The second model is a traditional knowledge distillation model which is again the same model but without the distillation pre training stage. TKD showed significant gains by leveraging large scale unsupervised Q&amp;A pairs for distillation pre training. Another benefit of TMKD is its unified framework to learn from multiple teachers jointly. For this, the authors were able to compare the impact of multi teacher versus single teacher knowledge distillation using two models. MKD a three layer bert based model trained by multi teacher distillation without a pre training stage. And KD, a three layer bert based model trained by single teacher distillation without a pre training stage. Whose aim is to learn from the average score of the teacher models. MKD outperforms KD on a majority of tasks demonstrating that a multi teacher distillation approach. Can help the student model learn more generalized knowledge, fusing knowledge from different teachers. Finally, they compared TKD, MKD and TMKD with each other. As you can see here, TMKD significantly outperforms TKD at MKD in all datasets. Which verifies the complementary impact of the two stages distillation: pre training and multi teacher fine tuning. In another example, researchers from google brain and Carnegie Mellon University trained models with a semi supervised learning method called noisy student. In this approach, the knowledge distillation process is iterative. It uses a variation of the classic teacher student paradigm. But here the student is purposely kept larger in terms of the number of parameters than the teacher. This is done so that the model can attain robustness, too noisy labels as opposed to traditional knowledge distillation patterns. This works by first training and efficient net as the teacher model using labeled images. And then using the teacher to generate pseudo labels on a larger set of unlabeled images. Next they train another larger efficient net as a student model on the combination of labeled and pseudo labeled images. This algorithm was reiterated a number of times by treating the student model as a teacher model to relabel the unlabeled data and train a new student model. An important element of his approach was to ensure that noise was added to the student model using dropout, stochastic depth, data augmentation, and so on. Via rand augment during its training. This noising pushed it to learn harder from pseudo labels. Adding noise to a student ensures that the task is much harder for the student and hence the name noisy student. And it doesn't merely learn the teacher's knowledge. In an side note, the teacher model is not noise during the generation of pseudo labels to ensure its accuracy isn't altered in any way. The loop closes by replacing the teacher with the optimized student network. Comparing the results of noisy student training the authors used efficient nets as their baseline models. This graph shows different sizes of efficient models along with some well known state of the art models for comparison. Note the results of the noisy student in red. One key factor is that the data sets were balanced across different classes, which improved training, especially for smaller models. These results show that knowledge distillation isn't just limited to smaller models, like distilBERT. But can also be used to increase the robustness of an already great model using noisy student training. Well, we covered a lot, didn't we first, we started with a discussion of distributed training. And then we turn to high performance modeling, including high performance ingestion, which turns out to be very important in high performance modeling. And then we turn to one of my favorite topics knowledge distillation.