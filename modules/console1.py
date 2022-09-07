from rich.console import Console
from rich.theme import Theme
from rich.traceback import install
from rich.json import JSON


install()

custom_theme = Theme({"1": "red"})
console = Console(theme=custom_theme)
