export const loggerTesting = async (req, res) => {
    try {
        req.logger.debug(`${req.method} en ${req.url}- ${new  Date().toISOString()} - Probando logger debug`)
        req.logger.http(`${req.method} en ${req.url}- ${new  Date().toISOString()} - Probando logger http`)
        req.logger.info(`${req.method} en ${req.url}- ${new  Date().toISOString()} - Probando logger info`)
        req.logger.warning(`${req.method} en ${req.url}- ${new  Date().toISOString()} - Probando logger warning`)
        req.logger.error(`${req.method} en ${req.url}- ${new  Date().toISOString()} - Probando logger error`)
        req.logger.fatal(`${req.method} en ${req.url}- ${new  Date().toISOString()} - Probando logger fatal`)
        res.status(200).send({message:"Test en consola"})
    } catch (err) {
        req.logger.error(`${req.method} en ${req.url}- ${new  Date().toISOString()}`)
        res.status(500).send(err);
    }
}
