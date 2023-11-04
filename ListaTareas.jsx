import { useReducer } from "react"
import { useForm } from "../hooks/useForm"

const initialState = [{
    id: new Date().getDate(),
    tarea: 'Explicar Reducer',
    finalizada: false
}]

const tareaReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case '[TAREA] Agregar tarea':
            return [...state, action.payload]

        case '[TAREA] finalizar tarea':
            return state.map(tarea => {
                if (tarea.id === action.payload) {
                    return {
                        ...tarea,
                        finalizada: !tarea.finalizada
                    }
                } return tarea
            })

        //return [...state, action.payload]
        case '[TAREA] Eliminar tarea':
            return state.filter(tarea => tarea.id !== action.payload)
        // return [...state, action.payload]
        case '[TAREA] Borrar tareas':
            return []
        default:
            return state
            break;
    }

    return state
}

export const ListaTareas = () => {

    const [tareaState, dispatch] = useReducer(tareaReducer, initialState)

    const { tarea, formState, onInputChange } = useForm({ tarea: '' })

    const agregarTarea = (e) => {
        e.preventDefault()
        if (formState.tarea == '') return
        const tarea = {
            id: new Date().getTime(),
            tarea: formState.tarea,
            finalizada: false
        }
        console.log(tarea)
        const action = {
            type: '[TAREA] Agregar tarea',
            payload: tarea
        }
        dispatch(action)
    }

    const finalizarTarea = ({ id }) => {
        const action = {
            type: '[TAREA] finalizar tarea',
            payload: id
        }
        dispatch(action)
    }

    const eliminarTarea = ({id})=>{
        const action = {
            type: '[TAREA] Eliminar tarea',
            payload: id
        }
        dispatch(action)
    }

    const reset = () =>{
        const action ={
            type: '[TAREA] Borrar tareas',
            payload: '',
        }
        dispatch(action)
    }

    return (
        <>
            <form onSubmit={agregarTarea}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="tarea"
                        name="tarea"
                        placeholder="Ingrese tarea"
                        value={tarea}
                        onChange={onInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-danger" onClick={reset}>Reset</button>
            </form>

            <hr />

            <ul className="list-group">
                {tareaState.map(item => {
                    return (
                        <li className="list-group-item d-flex justify-content-between" key={item.id}>
                            <span>{item.tarea}</span>
                            <div>
                                <input
                                    type="checkbox"
                                    value={item.finalizada}
                                    onChange={() => finalizarTarea(item)}
                                />
                                <button className="btn btn-danger" onClick={() => eliminarTarea(item)}>🗑</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>

    )
}
