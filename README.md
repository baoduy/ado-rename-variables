# Remane All Variables

Print to the screen all the available varaibles and their values for this job. Cross platform (work on Windows/Linux/Mac).

## Usage

Just add the task to your pipeline.

Work on Windows/Linux/Mac.

- In the classic editor:

![Task](https://i.imgur.com/RBYhCEL.png)

- In YAML pipelines:

```
steps:
- task: remaneVariables@1
  displayName: 'Print all variables'
```

_Thanks to: https://github.com/shayki5/azure-devops-print-all-variables_
