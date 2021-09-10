import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', (event) => {
        const urlProject = event.target.dataset.projectUrl; // Get the url from the view (to-do.pug)
        //console.log(urlProject);
        //console.log(location.origin + location.pathname)
        Swal.fire({
            title: 'Delete this project?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // using axios
                const url = `${location.origin}/projects/${urlProject}`;
                axios.delete(url, { params: { urlProject } })
                    .then(function (res) {
                        console.log(res)

                        Swal.fire(
                            'Deleted!',
                            res.data,
                            'success'
                        );

                        //redirect to home
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 3000)
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error'
                        })
                    })

            }
        })
    })
}

export default btnEliminar;