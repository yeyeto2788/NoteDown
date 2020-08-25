"""Common module for exception declaration used all over the application."""


class NoteDownAPIBaseError(Exception):
    """Base error used for inheritance purposes."""
    pass


class TokenError(NoteDownAPIBaseError):
    """Base token related error.

    All token exceptions should inherit from this exception, so it is easily
    handle all errors that occur when decoding, encoding and other operations.
    """
    pass


class TokenEncodingError(TokenError):
    """Used when an error occur encoding information into the token"""
    pass


class TokenDecodingError(TokenError):
    """Used when an error occur decoding information from the token"""
    pass


class TokenExpiredError(TokenError):
    """Used when token has expired."""
    pass


class DatabaseError(NoteDownAPIBaseError):
    """"""
    pass


class EntityNotFound(DatabaseError):
    """"""
    pass


class AuthorizationError(NoteDownAPIBaseError):
    """"""
    pass
