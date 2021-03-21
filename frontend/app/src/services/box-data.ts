export const getGroundHumidity = (boxId: string): Promise<GroundHumidityData[]> => {

    return fetch(`https://pib-server.azurewebsites.net/box-data/ground-humidity?boxId=${boxId}`,{
            method: 'GET'
        }).then(response=>{
            return response.json();
        }).catch(err=>console.log(err))
};

export interface GroundHumidityData {
    humidity: number;
    date: string;
};
