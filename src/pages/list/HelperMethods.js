
const estivageCentre1 = {
    name : "marina blanca",
    estivageCentreDates : [
        {
            startDate: "2023-05-02T18:00:00",
            endDate: "2023-05-05T18:00:00"
        },
        {
            startDate: "2022-05-02T18:00:00",
            endDate: "2022-05-05T18:00:00"
        }

    ],
}

const estivageCentre2 = {
    name : "marina blanca",
    estivageCentreDates : [
        {
            startDate: "2022-05-02T18:00:00",
            endDate: "2022-05-05T18:00:00"
        },
        {
            startDate: "2021-05-02T18:00:00",
            endDate: "2021-05-05T18:00:00"
        }

    ],
}

const estivageCentres = [estivageCentre1, estivageCentre2];


const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const isAvailable = (estivageCentres,startDate,endDate,destination) => {
    let estivageCentreFound = [];
    for(let i = 0; i < estivageCentres.length; i++) {
        for(let j = 0; j < estivageCentres[i].estivageCentreDates.length;j++ )
        {
            if(new Date(estivageCentres[i].estivageCentreDates[j].startDate)>= startDate && 
                new Date(estivageCentres[i].estivageCentreDates[j].endDate)<= endDate )
                {
                    estivageCentreFound.push(estivageCentres[i]);
                    break;
                }
        }
        
    }
    return estivageCentreFound;
  };

console.log(isAvailable(estivageCentres,new Date("2021-05-02T18:00:00"),new Date("2021-05-05T18:00:00")));

export default isAvailable;


