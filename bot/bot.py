import os
import telebot
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = '7291502017:AAGcylP-noBqutmqfyiIqTfurUuj2UmIUGU'
WEBAPP_URL = os.getenv('WEBAPP_URL', 'https://brobot1-production.up.railway.app')

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start'])
def send_welcome(message):
    markup = telebot.types.InlineKeyboardMarkup()
    markup.add(telebot.types.InlineKeyboardButton(text='Підключити гаманець', url=WEBAPP_URL))
    bot.reply_to(message, "Ласкаво просимо! Натисніть кнопку нижче, щоб підключити свій гаманець:", reply_markup=markup)

bot.polling()
