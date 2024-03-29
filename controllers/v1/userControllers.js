const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  store: async (req, res, next) => {
    try {
      let { name, email, password } = req.body;

      let exist = await prisma.user.findFirst({
        where: { email },
      });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "email already used!",
        });
      }

      let user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          profiles: {
            create: { identity_type, identity_number, address },
          },
        },
        include: {
          profiles: true,
        },
      });

      res.status(201).json({
        status: true,
        message: "success",
        data: user,
      });
    } catch (error) {}
  },
};
