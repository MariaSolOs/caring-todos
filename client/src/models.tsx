export type Todo = {
    title: string;
    description: string;
    category: 'WORK' | 'SCHOOL' | 'FAM-FRIENDS' | 'SELF-CARE';
    completed: boolean;
}