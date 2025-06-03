import CreateProblemForm from '../components/CreateProblemForm'
import { useAuthStore } from '../store/useAuthStore.js';

function AddProblem() {
  const {authUser, isCheckingAuth} = useAuthStore();
  return (
    <div>
      <CreateProblemForm/>
    </div>
  )
}

export default AddProblem