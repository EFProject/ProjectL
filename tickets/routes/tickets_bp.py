from flask import Blueprint

from controllers.TicketsController import get_allTickets, collect_ticket, get_tickets, delete_ticket, delete_all_tickets_user

tickets_bp = Blueprint('tickets_bp', __name__)

tickets_bp.route('/', methods=['GET'])(get_allTickets)
tickets_bp.route('/collect', methods=['POST'])(collect_ticket)
tickets_bp.route('/<int:user_id>', methods=['GET'])(get_tickets)
# tickets_bp.route('/<int:tickets_id>/edit', methods=['PUT'])(update_tickets)
tickets_bp.route('/<int:ticket_id>', methods=['DELETE'])(delete_ticket)
tickets_bp.route('/<int:user_id>/all', methods=['DELETE'])(delete_all_tickets_user)

