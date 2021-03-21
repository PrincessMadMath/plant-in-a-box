import { config } from './../core/config';
export const getGroundHumidity = (boxId: string): Promise<GroundHumidityData[]> => {

    return fetch(`${config.api.url}/box-data/ground-humidity?boxId=${boxId}`,{
            method: 'GET'
        }).then(response=>{
            return response.json();
        }).catch(err=>console.log(err))
};

export interface GroundHumidityData {
    humidity: number;
    date: string;
};
