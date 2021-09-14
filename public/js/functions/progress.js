import Swal from "sweetalert2";

export const uploadProgress = () => {
    // select tasks
    const tasks = document.querySelectorAll('li.tarea');

    if (tasks.length) {
        // select tasks completed
        const completedTasks = document.querySelectorAll('i.completo')

        //calculated the progress
        const progress = Math.round((completedTasks.length / tasks.length) * 100);

        //show the progress
        const percentage = document.querySelector('#porcentaje');
        percentage.style.width = progress + '%'

        if (progress == 50) {
            Swal.fire(
                'Litle left!',
                'Only half the work remains',
                'success'
            );
        }

        if (progress === 100) {
            Swal.fire(
                'Congratulations!',
                'You finished the project!',
                'success'
            );
        }
    }

}