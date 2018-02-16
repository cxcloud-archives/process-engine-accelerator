# Process Engine Accelerator

This is a starter project to use the [Process Engine Core](https://github.com/cxcloud/process-engine-core) project which is essentially an AWS SQS-based scheduler. For more information on how to set up the scheduler, refer to the documentation of the said project.

## Configuration

This project uses [`node-config`](lorenwest/node-config) for configuration and [`git-crypt`](AGWA/git-crypt) for encryption of configuration files.

After cloning the repo, follow [these instructions](https://github.com/cxcloud/api-accelerator/wiki/GPG-&-Git-Crypt-Installation) to install the required tools and then:

```sh
$ git-crypt unlock
```

Please contact the team to have your public gpg key to the project so you can unlock the configuration files.

## Deploy

This project's master branch is automatically deoployed to development environment on AWS.

## License

This software is released under the [MIT License](LICENSE).
