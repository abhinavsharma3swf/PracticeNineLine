ALTER TABLE nine_line
    ADD userid BIGINT;

ALTER TABLE nine_line
    ADD CONSTRAINT FK_NINELINE_ON_USERID FOREIGN KEY (userid) REFERENCES user_info (id);