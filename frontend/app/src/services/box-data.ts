export const getGroundHumidity = (): Promise<GroundHumidityData[]> => {

    return fetch(`/box-data/ground-humidity`,{
            method: 'GET'
        }).then(response=>{
            return response.json();
        }).then(response => {
            return response.values;
        }).catch(err=>console.log(err))
};

export interface GroundHumidityData {
    humidity: number;
    date: string;
};
