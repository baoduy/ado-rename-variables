import * as tl from 'vsts-task-lib/task';

interface ReplacePattern {
  from: string;
  to: string;
}

export const parsePattern = (p: string): ReplacePattern | undefined => {
  if (!p || !p.includes('=>')) return undefined;
  const s = p.split('=>');
  if (s.length != 2) return undefined;

  const pattern: ReplacePattern = { from: s[0].trim(), to: s[1].trim() };
  if (!pattern.from || !pattern.to) return undefined;

  return pattern;
};

export const replace = (input: string, patterns: ReplacePattern[]): string => {
  patterns.forEach(p => {
    if (!p) return;
    input = input.split(p.from).join(p.to);
  });

  return input;
};

async function run() {
  try {
    //Get variables
    const allVariables = tl.getVariables();
    //short by name
    var sortedArray = allVariables.sort((obj1, obj2) => {
      if (obj1.name > obj2.name) {
        return 1;
      }

      if (obj1.name < obj2.name) {
        return -1;
      }
      return 0;
    });

    //input
    const replaces = tl
      .getInput('replaceInput', true)
      .split('\n')
      .map(parsePattern);

    console.log('Replace patterns:', replaces);

    //Remane variables
    sortedArray.forEach(element => {
      const oldName = element.name;
      const newName = replace(element.name, replaces);

      if (oldName === newName) {
        //console.log(`${newName} was skipped as the new name is the same.`);
        return;
      }

      tl.setVariable(newName, element.value, element.secret);
      console.log(`Rename ${oldName} => ${newName}`);
    });

    tl.setResult(tl.TaskResult.Succeeded, '', true);
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
