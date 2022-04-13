import ONBOARDING from '../Constant/Constant'
import { GetDetails, InsertDetails, UpdateDetails, LocationMapping} from '../../Container';


const Route = [
    {
        name: ONBOARDING.GETDETAILS,
        component: GetDetails,
    },
    {
        name: ONBOARDING.INSERTDETAILS,
        component: InsertDetails,
    },
    {
        name: ONBOARDING.UPDATEDETAILS,
        component: UpdateDetails,
    },
    {
        name: ONBOARDING.LOCATIONMAPPING,
        component: LocationMapping,
    },


 
]
export default Route;
