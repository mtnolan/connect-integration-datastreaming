# connect-integration-datastreaming
## Amazon Connect Integration -- Data streaming

This integration enables Amazon Connect to communicate with Amazon Kinesis and Amazon Redshift to enable streaming of contact trace records (CTRs) into Amazon Redshift, within a secure virtual private cloud (VPC).

![Architecture for data streaming integration](https://d0.awsstatic.com/partner-network/QuickStart/connect/connect-integration-datastreaming-architecture.png)

For details and launch information, see the [data sheet](https://fwd.aws/KWN3A).

To post feedback, submit feature ideas, or report bugs, use the **Issues** section of this GitHub repo.


## Perficient Notes
Requires setup of a VPC with private and public subnets.  Redshift should be hosted in the public subnet and Lambda functions will be hosted in the private subnet.  The Private subnets route table should have a path to 0.0.0.0/0 to a NAT Gateway hosted in the public subnet.
