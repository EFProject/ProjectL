from flask import Blueprint

from controllers.EventController import get_events, create_event, get_event, update_event, delete_event

event_bp = Blueprint('event_bp', __name__)

event_bp.route('/', methods=['GET'])(get_events)
event_bp.route('/create', methods=['POST'])(create_event)
event_bp.route('/<int:event_id>', methods=['GET'])(get_event)
event_bp.route('/<int:event_id>/edit', methods=['PUT'])(update_event)
event_bp.route('/<int:event_id>', methods=['DELETE'])(delete_event)