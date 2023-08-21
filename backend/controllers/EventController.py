from datetime import datetime

from flask import jsonify, request

from models.event import Event, db


#get all events
def get_events():
    try:
        events = Event.query.order_by(Event.id.asc()).all()
        event_list = []
        for event in events:
            event_list.append(event.serialize)
        
        #if event_list:
        return {'events': event_list}
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "No event found"}), 404

#create an event
def create_event():
    try:
        description = request.json['description']
        event = Event(description)
        db.session.add(event)
        db.session.commit()
        return event.serialize
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

#get single event
def get_event(event_id):
    try:
        event = Event.query.filter_by(id=event_id).one()
        formatted_event = event.serialize
        return {'event': formatted_event}
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return 'No Event ' + str(event_id) + ' exists', 404


#edit an event
def update_event(event_id):
    try:
        event = Event.query.filter_by(id=event_id).one()  # Retrieve the event instance using .one()
        if not event:
            return jsonify({"message": "Event not found"}), 404
        
        new_description = request.json.get('description')
        event.description = new_description
        event.created_at = datetime.utcnow()  # Update the created_at field if needed
        
        db.session.commit()
        return jsonify({"message": "Event updated successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

#delete an event
def delete_event(event_id):
    try:
        event = Event.query.filter_by(id=event_id).one()
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Event deleted successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500
