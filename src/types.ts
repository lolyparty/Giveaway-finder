export interface MyFormData {
    email: string;
    password: string;
};

export interface GiveawayCardProps {
    title: string;
    description: string;
    endDate: string; 
    organizer: string;
    image: string; 
    id: string; 
    reserved?: boolean; 
    claimed?: boolean;
}