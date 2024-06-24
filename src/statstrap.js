const STATIT = 'https://api.gostatit.com/functions'
const CREDS = ['pub', 'fYqyWKEa'];

async function post(action, input) {
  let response = await fetch(STATIT, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(CREDS[0]+":"+CREDS[1]),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({action, input})
  });
  return await response.json();
}

document.querySelectorAll('[statit]').forEach(async element => {
  try {
  let query = element.getAttribute('statit').split(':');
  let action = query[0]
  let input = {};
  query[1].split(',').forEach(arg => input[arg.split('=')[0]]=arg.split('=')[1]);
  
  const data = await post(action, input);
  if (data.Error)
     element.innerHTML = [data.Error.code,data.Error.message,data.Error.param].join(':');
  else if(data.value)
     element.innerHTML = data.value;
  } catch (error) {
    element.innerHTML = 'ERROR_HTML';
  }
});  


