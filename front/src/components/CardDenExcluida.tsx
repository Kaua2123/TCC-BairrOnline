import { Card, CardHeader } from "@chakra-ui/react";


const CardDenExcluida = ({denunciaExcluida}) => {
    return(
        <Card boxShadow="lg" border="1px solid gray">
        <CardHeader>{denunciaExcluida.den_nome}</CardHeader>

      </Card>
    )

}

export default CardDenExcluida;