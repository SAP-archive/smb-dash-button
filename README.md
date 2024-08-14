# Deprecation Notice

This public repository is read-only and no longer maintained.

![](https://img.shields.io/badge/STATUS-NOT%20CURRENTLY%20MAINTAINED-red.svg?longCache=true&style=flat)

---
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/smb-dash-button)](https://api.reuse.software/info/github.com/SAP-samples/smb-dash-button)
[![License: Apache2](https://img.shields.io/badge/License-Apache2-green.svg)](https://opensource.org/licenses/Apache-2.0)

# smb-dash-button
[![SAP](https://i.imgur.com/0PLCJPD.png)](http://cloudplatform.sap.com/)

## Description
The AWS IoT Button is a programmable button based on the Amazon Dash Button hardware You can code the button's logic in the cloud to configure button clicks to count or track items, call or alert someone, start or stop something, order services, or even provide feedback.

This is a sample, serverless applications based on [AWS Lambda](https://aws.amazon.com/lambda/). It is coded in [NodeJ](https://nodejs.org/en/) and integrated with [SAP Business ByDesign](https://www.sap.com/uk/products/business-bydesign.html) using the [OData Services](https://odata.org) and to SAP Business One using the [Service Layer]()

A detailed tutorial is avaible [in this blog post](https://blogs.sap.com/2019/02/06/iot-made-simple-with-sap-business-one-and-sap-business-bydesign/)


## Requirements
* [AWS Account](https://aws.amazon.com/)
* [AWS IoT Button](https://aws.amazon.com/iotbutton/)


## Deployment
1 - Follow the steps in [in this blog post](https://blogs.sap.com/2019/02/06/iot-made-simple-with-sap-business-one-and-sap-business-bydesign/) to ha ve your IoT button registered on your AWS account

2 - Download the [latest release of this sample](https://github.com/SAP-samples/smb-dash-button/releases/latest)

3 - Upload to your AWS Lambda function (created during the registration)

4 - Set the environment variables according to your B1 and/or ByD environments

## Support and Contributions  
This repository is provided "as-is". With no Warranty or support

If you have questions, please ask.

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
