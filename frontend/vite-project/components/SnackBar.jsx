import { useSnackbar } from "notistack";

const useSnackBar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnack = (msg, variant = "warning") => {
    enqueueSnackbar(msg, { variant });
  };

  return { showSnack };
};

export default useSnackBar;
