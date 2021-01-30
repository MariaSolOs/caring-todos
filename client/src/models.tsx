export type Todo = {
    _id: string;
    title: string;
    description: string;
    category: 'WORK' | 'SCHOOL' | 'FAM-FRIENDS' | 'SELF-CARE';
    completed: boolean;
}