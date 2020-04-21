import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState';
import { today } from '../../utils/format';
import Button from '@material-ui/core/Button';

export const AddTask = () => {
  const [text, setText] = useState('');
  const [type, setType] = useState('Puntual');

  const { addTask } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    const newTask = {
      text,
      type
    }
    addTask(newTask);
    setText('');
  };
  useEffect(() => {
    console.log(`changed type to: ${type}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type]);
  const typeFactory = [
    { id: "Puntual",
      datePicker: [ 
        <label htmlFor="fecha">
          Fecha:
        </label>,
        <input key="2" type="date" id="fecha" name="fecha" defaultValue={today()} />
      ] 
    }, 
    { id: "Mensual",
      datePicker: [ 
        <label htmlFor="fecha">
          Fecha:
        </label>,
        <input key="2" type="date" id="fecha" name="fecha" defaultValue={today()} />
      ] 
    }, 
    { id: "Anual",
    datePicker: [ 
      <label htmlFor="fecha">
        Fecha:
      </label>,
      <input key="2" type="date" id="fecha" name="fecha" defaultValue={today()} />
    ] 
    },
    { id: "Programada",
      datePicker: [ 
        <label htmlFor="fechaInicio">
          Inicio:
        </label>,
        <input key="02a" type="date" id="fechaInicio" name="fecha" defaultValue={today()} />,
        <label htmlFor="fechaFin">
          Fin:
        </label>,
        <input key="03a" type="date" id="fechaFin" name="fecha" defaultValue={today()} />
      ] 
    }
  ];
  return (
    <>
      <h3>Nueva Tarea</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Nombre</label>
          <input key="1" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Introduce el nombre..." />
        </div>
        <div className="form-control">
          <label htmlFor="tipo">Tipo</label>
          <div>
          {typeFactory.map((t, index) => (
            <>
              <input key={index} type="radio" id={t.id} name="tipo" value={t.id} onChange={(e) => setType(e.target.value)} defaultChecked={t === 'Puntual'}/>
              <label htmlFor={t.id}>
                {t.id}
              </label>
            </>
          ))}
             {typeFactory.find(element => element.id === type).datePicker}
          </div>
        </div>
        <button className="btn">Añadir</button>
        <Button color='primary' variant='outlined'>Añadir</Button>
      </form>
    </>
  )
}
