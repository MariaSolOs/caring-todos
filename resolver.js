const { AuthenticationError } = require('apollo-server-express');

module.exports = {
    User: {
        todos: (user, _, { dataSources }) => {
            return dataSources.todosAPI.getTodosByUser(user._id)
        }
    },

    Query: {
        todos: (_, __, { dataSources }) => {

        }
        // instructors: (_, __, { dataSources, user }) => {
        //     if(!user) {
        //         throw new AuthenticationError('Not logged in');
        //     }

        //     return dataSources.instructorAPI.getAllInstructors();;
        // },

        // appointments: async (_, { instId, date }, { dataSources, user }) => {
        //     if(!user) {
        //         throw new AuthenticationError('Not logged in');
        //     }

        //     const appts = await dataSources.appointmentAPI.getAllAppointments();
        //     return appts.filter(appt => (
        //         date === appt.date && instId === `${appt.instructor}`
        //     ));
        // }
    },

    Mutation: {
        // login: async (_, { email }, { dataSources }) => {
        //     let user;
        //     user = await dataSources.studentAPI.getStudentByEmail(email);
        //     if(!user) {
        //         user = await dataSources.instructorAPI.getInstructorByEmail(email);
        //     }
        //     if(!user) {
        //         throw new AuthenticationError('Email does not exist.');
        //     }
    
        //     return user;
        // },

        // bookAppointment: async (_, { apptId }, { dataSources, user }) => {
        //     try {
        //         await dataSources.appointmentAPI.bookAppointment(apptId, user._id);

        //         const appt = await dataSources.appointmentAPI.getAppointmentById(apptId);
        //         const instructor = await dataSources.instructorAPI.getInstructorById(appt.instructor);
        //         const student = await dataSources.studentAPI.getStudentById(user._id);

        //         sendEmailToStudent(student.email, 
        //                            instructor.name, 
        //                            appt.date, 
        //                            appt.timeslot, 
        //                            instructor.zoomLink);
        //         sendEmailToInstructor(instructor.email,
        //                               student.name,
        //                               instructor.name,
        //                               appt.date,
        //                               appt.timeslot,
        //                               instructor.zoomLink);

        //         return appt;
        //     } catch(err) {
        //         return new Error(`Booking failed: ${err}`);
        //     }
        // }
    }
}