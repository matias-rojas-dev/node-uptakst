import axios from "axios";
import Swal from "sweetalert2";

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    tareas.addEventListener('click', (event) => {
        if (event.target.classList.contains('fa-check-circle')) {
            // get id task
            const icon = event.target;
            // The parentElement property returns the parent element of the specified element.
            // https://www.w3schools.com/jsref/prop_node_parentelement.asp

            const idTask = icon.parentElement.parentElement.dataset.tarea;

            //req to tareas/id
            const url = `${location.origin}/tareas/${idTask}`;

            axios.patch(url, { idTask })
                .then(function (response) {
                    if (response.status === 200) {
                        // https://developer.mozilla.org/es/docs/Web/API/Element/classList
                        icon.classList.toggle('completo')
                    }
                })

        }
        if (event.target.classList.contains('fa-trash')) {
            const taskHTML = event.target.parentElement.parentElement;
            const taskId = taskHTML.dataset.tarea;

            Swal.fire({
                title: 'Delete this task?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    // send the delete by axios
                    const url = `${location.origin}/tareas/${taskId}`;

                    axios.delete(url, { params: { taskId } })
                        .then(function (response) {

                            if (response.status === 200) {
                                taskHTML.parentElement.removeChild(taskHTML)

                            }

                            Swal.fire(
                                'Deleted!',
                                response.data,
                                'success'
                            );


                        })
                        .catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error'
                            })
                        })
                }
            });

            console.log(taskId, taskHTML)

        }
    })
}

export default tareas;