from flask import request, jsonify
from datetime import datetime
import requests
from flask import jsonify, request
from models.tickets import Tickets, db
import os
api_key = os.environ.get("TICKETS_API")


# get all tickets

def get_allTickets():
    try:
        countryCode = request.args.get('countryCode')

        keyword = request.args.get('keyword')

        size = request.args.get('size')
        if size is not None and int(size) <= 0:
            size = None

        page = request.args.get('page')
        if page is not None and int(page) <= 0:
            page = None

        #url for ticket master sports  
        url = f'https://app.ticketmaster.com/discovery/v2/events?classificationId=KZFzniwnSyZfZ7v7nE&locale=*'

        if countryCode:
            url += f'&countryCode={countryCode}'

        if keyword:
            url += f'&keyword={keyword}'

        if size:
            url += f'&size={size}'

        if page:
            url += f'&page={page}'

        url += f'&apikey={api_key}'

        response = requests.get(url)
        allTickets = response.json()
        totalPages= allTickets.get("page", {}).get("totalPages")
        allTickets = allTickets.get("_embedded", {}).get("events", [])
        allTicketsFormatted = []

        for ticket in allTickets:
            ticketFormatted = {}

            if "accessibility" in ticket:
                ticketFormatted["ticketLimit"] = ticket["accessibility"].get("ticketLimit", None)
            
            if "priceRanges" in ticket:
                ticketFormatted["priceRanges"] = ticket.get("priceRanges", [])[0]

            ticketFormatted["localDate"] = ticket.get("dates", {}).get("start", {}).get("localDate", None) + " " + ticket.get("dates", {}).get("start", {}).get("localTime", None)
            ticketFormatted["urlToImage"] = ticket.get("images", [])[0].get("url", None)
            ticketFormatted["info"] = ticket.get("info", None)
            ticketFormatted["name"] = ticket.get("name", None)
            ticketFormatted["promoter"] = ticket.get("promoter", {}).get("name", None)
            ticketFormatted["url"] = ticket.get("url", None)

            allTicketsFormatted.append(ticketFormatted)

        return jsonify({"allTickets": allTicketsFormatted, "totalPages": totalPages})
    except Exception as e:
        print("Exception:", e)
        return jsonify({"Error": e}), 404


# add tickets to the user profile

def collect_ticket():
    try:
        name = request.json['name']
        info = request.json['info']
        promoter = request.json['promoter']
        urlToImage = request.json['urlToImage']
        localDate = request.json['localDate']
        user_id = request.json['user_id']
        url = request.json['url']
        tickets = Tickets(name, info, promoter, urlToImage, localDate, user_id, url)
        db.session.add(tickets)
        db.session.commit()
        return tickets.serialize
    except Exception as e:
        print("Exception:", e)
        return jsonify({"message": e}), 500


# get tickets from an user

def get_tickets(user_id):
    try:
        tickets = Tickets.query.filter_by(user_id=user_id).order_by(
            Tickets.localDate.desc()).all()

        tickets_list = []
        for n in tickets:
            tickets_list.append(n.serialize)

        return {'tickets': tickets_list}
    except Exception as e:
        print("Exception:", e)
        return 'No Tickets for the user ' + str(user_id) + ' exists', 404


# # edit a ticket

# def update_tickets(tickets_id):
#     try:
#         # Retrieve the tickets instance using .one()
#         tickets = Tickets.query.filter_by(id=tickets_id).one()
#         if not tickets:
#             return jsonify({"message": "Tickets not found"}), 404

#         new_title = request.json.get('title')
#         new_author = request.json.get('author')
#         new_urlToImage = request.json.get('urlToImage')
#         new_published_at = request.json.get('published_at')
#         new_user_id = request.json.get('user_id')
#         new_url = request.json.get('url')
#         tickets.title = new_title
#         tickets.author = new_author
#         tickets.urlToImage = new_urlToImage
#         tickets.published_at = new_published_at
#         tickets.user_id = new_user_id
#         tickets.url = new_url

#         db.session.commit()
#         return jsonify({"message": "Tickets updated successfully"})
#     except Exception as e:
#         print("Exception:", e)  # Print the specific exception for debugging
#         return jsonify({"message": "Something went wrong"}), 500


# delete a ticket from collection

def delete_ticket(ticket_id):
    try:
        ticket = Tickets.query.filter_by(id=ticket_id).one()
        db.session.delete(ticket)
        db.session.commit()
        return jsonify({"message": "Ticket deleted successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

def delete_all_tickets_user(user_id):
    try:
        all_tickets = Tickets.query.filter_by(user_id=user_id).all()
        for ticket in all_tickets:
            db.session.delete(ticket)
        db.session.commit()
        return jsonify({"message": "All your tickets has been deleted correctly successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500