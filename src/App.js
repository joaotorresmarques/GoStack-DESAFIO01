import React, { useState, useEffect } from "react";
import Api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    Api.get('repositories').then(res => {
      setRepository(res.data)
    })
  }, [])
  async function handleAddRepository() {
    const response = await Api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: 'teste',
      techs: [
        'teste1',
        'teste2'
      ]
    });

    const repository = response.data;
    setRepository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await Api.delete(`repositories/${id}`);
    const listRepository = repositories.filter(repo => repo.id !== id);
    setRepository(listRepository);


  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(rep => (

          <li key={rep.id}> {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
