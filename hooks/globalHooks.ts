import { Dispatch, SetStateAction, useState } from "react";

export const useGlobalHooks = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<{ [key: string | number]: boolean }>(
    {},
  );
  const [toggle, setToggle] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState({ error: false, errMessage: "" });

  const handleToggle = (id: string) => {
    setToggle((prev) => ({ [id]: !prev[id] }));
  };

  const btnTaps = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const getColor = (rating: number, index: number) => {
    if (rating >= index + 1) {
      // Color for rated stars
      return "rated";
    }
    // Color for unrated stars
    return "noRating";
  };

  const uploadFilesToServer = async (file: any) => {
    // get the upload file
    if (file) {
      // apend the uploaded file
      const formData = new FormData();
      formData.append("file", file);

      // eslint-disable-next-line no-useless-catch
      try {
        // Add it to the endpoint body
        // const resp = await API.uploadFiles(formData);
        // return the response and used as wished
        // return resp;
      } catch (error) {
        throw error;
      }
    }
  };

  // Search function
  const handleSearch = <T>(
    data: T[],
    searchQuery: string,
    setData: Dispatch<SetStateAction<T[]>>,
    keys: (keyof T)[],
  ) => {
    if (!data || data.length === 0) {
      return;
    }
    const filtered =
      searchQuery !== ""
        ? data.filter((item) =>
            keys.some((key) =>
              String(item[key])
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            ),
          )
        : data;
    setData(filtered);
  };

  const removeFieldsFromObj = <T>(
    obj: T,
    fieldToRemove: (keyof T)[],
  ): Partial<T> => {
    const newObj = { ...obj };

    fieldToRemove.forEach((feild) => {
      delete newObj[feild];
    });
    return newObj;
  };

  return {
    removeFieldsFromObj,
    show,
    setShow,
    btnTaps,
    getColor,
    loading,
    setLoading,
    errors,
    setErrors,
    open,
    setOpen,
    uploadFilesToServer,
    handleSearch,
    handleToggle,
    toggle,
    setToggle,
  };
};
