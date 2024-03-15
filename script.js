const bcrypt = require('bcrypt');

const fn = async () => {

  const hash = bcrypt.hashSync("43280743", 1);
  console.log(hash)
  const hash2 = bcrypt.hashSync("43280743", 1);
  console.log(hash2)

  const isTrue = await bcrypt.compare("43280743", "$2b$04$i39zus4zGwGidN7QoHhTiu47aIPBUrJHnjyAYvIhk2BzUSisQi7X6")
  console.log(isTrue)

}
fn()