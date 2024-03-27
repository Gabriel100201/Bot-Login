const { setNewUser } = require("./src/db");

const fn = async () => {
  try {
    const userCreated = await setNewUser({ userName: "asdas", password: "sdasd", imageId: "2b590f7c476f6c429886339b3052628ffaa414175697a821fa46627171723418", company: "2312", rol: "23123" });
  } catch (error) {
    console.error('Error al crear un nuevo usuario:', error);
  }
}

fn()