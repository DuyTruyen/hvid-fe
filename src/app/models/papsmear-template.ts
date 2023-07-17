export interface PapsmearTemplate {
    templateId?: string;
    templateName?: string;
    code?: string;
    templateExtName?: string;
    hasChild?: boolean;
    parentName?: string;
    parentId?: string;
    microbodyDescribe?: string;
    diagnose?: string;
    discuss?: string;
    recommendation?: string;
    consultaion?: string;
    isFirstChild?: boolean;
}
export const INIT_PAPSMEAR_TEMPLATE: PapsmearTemplate = {
    templateId: '',
    templateName: '',
    code: '',
    templateExtName: '',
    hasChild: false,
    parentName: '',
    parentId: '',
    microbodyDescribe: '',
    diagnose: '',
    discuss: '',
    recommendation: '',
    consultaion: '',
    isFirstChild: true,
};
