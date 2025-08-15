
import diagnose from '../data/diagnoses';
import type { IDiagnose } from '../types/types';

export const getDiagnose = ():IDiagnose[] =>{
    return diagnose;
};

export default { getDiagnose };