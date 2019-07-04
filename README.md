#This Group of Nodes aims to generate Train MetaData

## Introduction
Federated Learning (FL) is a distributed machine learning approach which enables training  on a large corpus of decentralized data residing on devices like mobile phones. FL is one instance of the more general approach of “bringing the code to the data, instead of the data to the code” and addresses the fundamental problems of privacy, ownership, and locality of data. The idea is to use data from a number of computing devices like smart-phones instead of a centralized data source.
https://justmachinelearning.com/2019/03/10/federated-learning/

Due to lack of different approaches, as well as the well-integrated infrastructure, the steps involved in the execution evaluation of large Federated Learning (FL) process are time consuming and performed in isolated environments, usually managed by professionals from IT area, who usually are comfortable with command line as well as programming language like R or Python to deal with the aggregation.
In this article we will introduce the The Semantic Metada Data Oriented Federated Laening (SmoFL). 
A propose of specification for a semantic train which provide a flexible environment to visible organize the train execution work flow. Improving the security and reproducibility and ownership, in fact the proposed specification was designed to each train be a Digital Object by default. We will show how we defined an exclusive Digital Object Repository,to hold the trains created to follow the proposed specification(vii).

All the meta data which supports the Train structure are based in well defined patterns, such as, DataCite and Zenodo to achieve the Digital Object Interface (DOI) compliance(vii). To achieve the security layer we are OAuth 2.0(viii), as well as, the open container initiative (OCI) to be in compliance with the containerization perspective(iv). 

Finally, we will introduce the first version of the Train platform(x), which aims to support the specification, expressed in an abstract way as the Train node, which could contain one or many Wagons, where each Wagon could contain one or more Resources, where each Resource could contain one or more Artifacts (xi).

\section{Epecification}
The Semantic Meta Data Oriented Federated Learning (SmoFL), exposed in this paper, aims to propose a flexible, extensible, as well as, ease to understand, group of of meta data, to provide a rich approach to develop, execute, share and produce a single or group of Federated Learning (FL), which are developed under the SmoFL standard, as well as the same SmoFL infrastructure (xii).
\subsection{Meta Data}
The Meta Data specification is based on the Digital Object Interface (DOI), and the Open Container Initiative (OCI), as well as, the The Semantic Meta Data Oriented Federated Learning (SmoFL). Where the first property (DOI) provides the ability to each new Train,  based on SmoFL, be a Digital Object by default. In the same way the second property (OCI) provides the ability to each new Train,  based on SmoFL, be a container by default (eg.: Like a docker container). Finally the Train should extends the SmoFL meta data.

* Author: Joao Bosco Jares - [@jbjares](jbjares@gmail.com) (Fraunhofer FIT) 
* ORCID: https://orcid.org/0000-0001-6066-2602


## Copyright and license

Copyright JS Foundation and other contributors, http://js.foundation under [the Apache 2.0 license](LICENSE).
