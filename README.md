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


## Copy repository

1. Create clone of this repository and navigate to it:
```sh
$ git clone https://github.com/cxcloud/process-engine-accelerator.git
$ cd process-engine--accelerator
```
2. Remove git tracking and create a new repository:
```sh
$ rm -rf .git
$ git init
```
3. Add and verify a new remote:
```sh
$ git remote add origin https://github.com/*user*/*repo*.git
$ git remote -v
```
4. Push to new remote:
```sh
$ git commit -am "Initial commit"
$ git push --set-upstream origin master [--force]
```

## License

This software is released under the [MIT License](LICENSE).
