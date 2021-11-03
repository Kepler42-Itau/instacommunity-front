export default function Request() {
  const ops: RequestInit = {
    method: 'GET',
  };

  let id = Math.round(Math.random() * (5 - 1) + 1);

  return fetch(`http://localhost:8080/greeting/${id}`, ops)
    .then((resp) => {
      console.log(resp);
      if (resp.status === 200) return resp.json();
      else return { id: -1, phrase: 'Bad id!' };
    })
    .catch((error) => {
      console.error('There is an error!!!', error);
    });
}
