// UserLogin Schema:
userLogin = {
    userId,
    username,
    email,
    password,
    role
}


// NGO Schema:
ngoDir = {
    ngoId,
    properties: {
        name,
    registration_no,
    zone: [],
    state,
    address,
    sector,
    website,
    email,
    phone
    },
    $events: [$events.eventId],
    volunteers: [{
        volunteer: $volunteers.volId,
        status: [joined, left, requested]
    }]
}

// Event Schema:
events = {
    eventId,
    properties: {
        name,
        description,
        startDate,
        endDate,
        location: {
            address,
            mapLink
        },
        $organizer: $ngoDir.ngoId
    },
    $attendees: [$volunteers.volId],
    status: [upcoming, running, closed]
}

// Volunteer Schema:
volunteers = {
    volId,
    properties: {
        name: {
            first,
            last
        },
        father_name,
        dob,
        gender,
        phone,
        email,
        address: {
            locality,
            city,
            state,
            pincode
        },
        experience: [],
        photo,
        aadhar: {
            front,
            back
        }
    },
    $joined_ngo: [{
        $ngo: $ngoDir.ngoId,
        $zone: $ngoDir.zone
    }],
    event_enroll: [{
        $event: $events.eventId,
        status: [joined, left, completed]
    }]
}
